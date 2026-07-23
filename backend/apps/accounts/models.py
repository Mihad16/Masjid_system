from django.db import models

class Member(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100, blank=True ,null=True)  # simple for now
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    address = models.TextField()

    def __str__(self):
        return self.name