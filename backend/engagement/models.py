from django.db import models
from users.models import User
from posting.models import Posts
from comments.models import Comments


class LikesPost(models.Model):
    """
    Model for liking posts. Liking between user and posts need to be unique
    such that the user cannot like / react to the same post multiple times. 
    """
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    post = models.ForeignKey(Posts, null=False, blank=False, on_delete=models.CASCADE)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "post"], name="unique_liking_post")
        ]

class LikesComment(models.Model):
    """
    Model for liking comments. Liking between user and comments need to be unique
    such that user cannot like / react to the same comment multiple times.
    """
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comments, null=False, blank=False, on_delete=models.CASCADE)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "comment"], name="unique_liking_comment")
        ]

        
    