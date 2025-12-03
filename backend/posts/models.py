from django.db import models
from backend.users.models import User

class Posts(models.Model):
    title = models.CharField(max_length=512)
    content = models.TextField()
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    author_id = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        db_table = "Posts"
        verbose_name = "Post"
        verbose_name_plural = "Posts"