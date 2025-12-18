from rest_framework import permissions 

class IsAnAuthor(permissions.BasePermission):
    """
    Checks if the user is an assigned author.
    """
    def has_permission(self, request, view):
        return request.user.role.lower() == "author"
