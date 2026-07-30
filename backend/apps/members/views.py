import uuid
from django.db import models
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Member
from .serializers import MemberSerializer


def find_member(id_val):
    if not id_val:
        return None
    s_val = str(id_val).strip()

    # 1. Direct match on member_id (e.g. MAS0001), phone, or name
    m = Member.objects.filter(
        models.Q(member_id__iexact=s_val) |
        models.Q(phone=s_val) |
        models.Q(name__iexact=s_val)
    ).first()
    if m:
        return m

    # 2. If digit, try matching MIJM000X or integer pk
    if s_val.isdigit():
        num = int(s_val)
        formatted_mas = f"MIJM{num:04d}"
        m = Member.objects.filter(
            models.Q(member_id__iexact=formatted_mas) | models.Q(pk=num)
        ).first()
        if m:
            return m

    # 3. Fallback UUID match if passed
    try:
        uuid_obj = uuid.UUID(s_val)
        m = Member.objects.filter(member_id=str(uuid_obj)).first()
        if m:
            return m
    except (ValueError, AttributeError):
        pass

    return None


def get_member_id_str(member):
    if not member.member_id:
        member.member_id = f"MIJM{member.id:04d}"
        member.save(update_fields=['member_id'])
    return member.member_id


@api_view(['GET'])
def get_members(request):
    members = Member.objects.all()
    serializer = MemberSerializer(members, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_member(request):
    serializer = MemberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def delete_member(request, id):
    member = find_member(id)
    if not member:
        return Response({"error": "Not found"}, status=404)
    member.delete()
    return Response({"message": "Deleted"})


@api_view(['PUT'])
def update_member(request, id):
    member = find_member(id)
    if not member:
        return Response({"error": "Not found"}, status=404)

    serializer = MemberSerializer(member, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_member_detail(request, id):
    member = find_member(id)
    if not member:
        return Response({"error": "Not found"}, status=404)
    serializer = MemberSerializer(member)
    return Response(serializer.data)


@api_view(['GET'])
def member_profile(request, id):
    m = find_member(id)
    if not m:
        return Response({"error": "Not found"}, status=404)
    mid = get_member_id_str(m)
    return Response({
        "id": mid,
        "member_id": mid,
        "name": m.name,
        "phone": m.phone,
        "address": m.address,
        "is_active": m.is_active
    })


@api_view(['POST'])
def member_login(request):
    identifier = (
        request.data.get("identifier")
        or request.data.get("username")
        or request.data.get("member_id")
        or request.data.get("phone")
        or ""
    ).strip()
    password = request.data.get("password")

    if not identifier:
        return Response({"error": "Please enter Member ID (e.g. MAS0001), Phone number or Name"}, status=400)

    member = find_member(identifier)

    if not member:
        return Response({"error": "Member not found"}, status=404)

    mid = get_member_id_str(member)

    # First time login check (if member has no password)
    if not member.password:
        return Response({
            "first_login": True,
            "id": mid,
            "member_id": mid,
            "name": member.name
        })

    # Password validation
    if password is not None and password != "":
        if member.password == password:
            return Response({
                "id": mid,
                "member_id": mid,
                "name": member.name,
                "phone": member.phone,
                "address": member.address,
                "is_active": member.is_active
            })
        else:
            return Response({"error": "Wrong password"}, status=400)

    return Response({
        "first_login": False,
        "id": mid,
        "member_id": mid,
        "name": member.name
    })


@api_view(['POST'])
def set_password(request, id):
    m = find_member(id)
    if not m:
        return Response({"error": "Member not found"}, status=404)
    password = request.data.get("password")
    if not password or len(password) < 6:
        return Response({"error": "Password must be at least 6 characters"}, status=400)
    m.password = password
    m.save()
    return Response({"message": "Password created successfully"})