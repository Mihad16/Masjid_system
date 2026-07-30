from rest_framework import serializers
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        mid = instance.member_id or (f"MAS{instance.id:04d}" if instance.id else '')
        rep['id'] = mid
        rep['member_id'] = mid
        return rep