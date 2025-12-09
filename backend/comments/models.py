from django.db import models
from users.models import User
from posting.models import Posts

class Comments(models.Model):
    reply = models.TextField()
    likes = models.IntegerField(default=0)
    reply_time = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    author_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
    
    class Meta:
        db_table = "Comments"
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
        ordering = ["-reply_time"]
    
class CommentHierarchyTable(models.Model):
    original_comment = models.ForeignKey(
        Comments, 
        related_name='original_comment', 
        on_delete=models.CASCADE
    )
    
    descendant_comment = models.ForeignKey(
        Comments, 
        related_name='descendant_comment', 
        on_delete=models.CASCADE
    )
    
    depth = models.IntegerField()
    
    class Meta:
        db_table = "CommentHierarchyTable"
        verbose_name = "Comment Hierarchy"
        verbose_name_plural = "Comment Hierarchies"