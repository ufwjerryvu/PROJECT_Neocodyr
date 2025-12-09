from django.db import models
from django.core.exceptions import ValidationError
from users.models import User
from django.db.models import Q

class Class(models.Model):
    """
    Establishes an enrollment for the type of course the user is a part taking.
    """
    title = models.CharField(max_length=255)
    description = models.TextField(null=False)
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author_id = models.ForeignKey(
        User, 
        null=False, 
        blank=False,
        on_delete=models.CASCADE
    )
    
    # Manditory checks applied for specific users
    instructor = models.ManyToManyField(User, through="ClassInstructor", related_name="instructor")
    student = models.ManyToManyField(User, through="ClassStudent", related_name="student")    
    
    class Meta:
        db_table = "Classes"
        verbose_name = "Class"
        verbose_name_plural = "Classes"
        
class ClassInstructor(models.Model):
    class_ = models.ForeignKey(Class, on_delete=models.CASCADE)
    user_ = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        constraint = {
            models.CheckConstraint(
                check=Q(user__role="instructor"),
                name="instructor_teaches_class"
            )
        } 
    
    def clean(self):
        if self.user_.role != "instructor":
            raise ValidationError("Only instructors may only teach this class.")
        
        
class ClassStudent(models.Model):
    class_ = models.ForeignKey(Class, on_delete=models.CASCADE)
    user_ = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        constraint = {
            models.CheckConstraint(
                check=Q(user__role="student"),
                name="student_attends_class"
            )
        }  
        
    def clean(self):
        if self.user_.role != "student":
            raise ValidationError("Only students may be added to this class.")
        

    