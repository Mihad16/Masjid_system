from django.db import models

class Member(models.Model):
    id = models.BigAutoField(primary_key=True)
    member_id = models.CharField(
        max_length=20,
        unique=True,
        blank=True,
        null=True
    )
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.member_id:
            last = Member.objects.filter(member_id__startswith="MIJM").order_by("-id").first()
            if last and last.member_id:
                try:
                    num = int(last.member_id.replace("MIJM", ""))
                    self.member_id = f"MIJM{num + 1:04d}"
                except ValueError:
                    self.member_id = f"MIJM{Member.objects.count() + 1:04d}"
            else:
                self.member_id = f"MIJM{Member.objects.count() + 1:04d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.member_id})"