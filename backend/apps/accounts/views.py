from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Member
from .serializers import MemberSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

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
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['DELETE'])
def delete_member(request, id):
    try:
        member = Member.objects.get(id=id)
        member.delete()
        return Response({"message": "Deleted"})
    except Member.DoesNotExist:
        return Response({"error": "Not found"})
    

@api_view(['PUT'])
def update_member(request, id):
    try:
        member = Member.objects.get(id=id)
    except Member.DoesNotExist:
        return Response({"error": "Not found"})

    serializer = MemberSerializer(member, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_member_detail(request, id):
    try:
        member = Member.objects.get(id=id)
        serializer = MemberSerializer(member)
        return Response(serializer.data)
    except Member.DoesNotExist:
        return Response({"error": "Not found"})
    

@api_view(['GET'])
def member_profile(request, id):
    try:
        member = Member.objects.get(id=id)
        return Response({
            "id": member.id,
            "name": member.name,
            "username": member.username,
            "phone": member.phone,
            "address": member.address
        })
    except Member.DoesNotExist:
        return Response({"error": "Not found"})
    

@api_view(['POST'])
def member_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        member = Member.objects.get(username=username, password=password)

        return Response({
            "id": member.id,
            "name": member.name,
            "username": member.username,
            "phone": member.phone,
            "address": member.address
        })

    except Member.DoesNotExist:
        return Response({"error": "Invalid credentials"})
    
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Member

# GET profile
@api_view(['GET'])
def member_profile(request, id):
    try:
        m = Member.objects.get(id=id)
        return Response({
            "id": m.id,
            "name": m.name,
            "username": m.username,
            "phone": m.phone,
            "address": m.address
        })
    except Member.DoesNotExist:
        return Response({"error": "Not found"})


# UPDATE profile
@api_view(['PUT'])
def update_member(request, id):
    try:
        m = Member.objects.get(id=id)

        m.name = request.data.get("name")
        m.phone = request.data.get("phone")
        m.address = request.data.get("address")
        m.save()

        return Response({"message": "Updated"})
    except Member.DoesNotExist:
        return Response({"error": "Not found"})
    

@api_view(['POST'])
def member_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        m = Member.objects.get(username=username)

        # 🔥 FIRST LOGIN
        if not m.password:
            return Response({
                "first_login": True,
                "id": m.id
            })

        # 🔐 NORMAL LOGIN
        if m.password == password:
            return Response({
                "id": m.id,
                "name": m.name,
                "username": m.username,
                "phone": m.phone,
                "address": m.address
            })

        # ❌ WRONG PASSWORD
        return Response({"error": "Wrong password"})

    except Member.DoesNotExist:
        return Response({"error": "User not found"})

@api_view(['POST'])
def set_password(request, id):
    try:
        m = Member.objects.get(id=id)
        m.password = request.data.get("password")
        m.save()

        return Response({"message": "Password set successfully"})

    except Member.DoesNotExist:
        return Response({"error": "Not found"})