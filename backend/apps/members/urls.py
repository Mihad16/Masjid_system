from django.urls import path
from .views import delete_member, delete_member, get_member_detail, get_member_detail, get_members, add_member, member_login, member_profile, update_member, update_member, set_password

urlpatterns = [
    path('', get_members),
    path('add/', add_member),
       path('<int:id>/', delete_member),
       path('update/<int:id>/', update_member),
       path('<int:id>/', get_member_detail),
         path('profile/<int:id>/', member_profile),
    path('update/<int:id>/', update_member),
          path('login/', member_login), 
          
    path('set-password/<int:id>/', set_password),
]
