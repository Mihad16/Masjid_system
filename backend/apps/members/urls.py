from django.urls import path
from .views import (
    get_members,
    add_member,
    delete_member,
    update_member,
    get_member_detail,
    member_profile,
    member_login,
    set_password
)

urlpatterns = [
    path('', get_members),
    path('add/', add_member),
    path('login/', member_login),
    path('profile/<str:id>/', member_profile),
    path('update/<str:id>/', update_member),
    path('delete/<str:id>/', delete_member),
    path('set-password/<str:id>/', set_password),
    path('<str:id>/', get_member_detail),
]
