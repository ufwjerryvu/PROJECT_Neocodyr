from rest_framework import serializers
from .models import Comments, CommentHierarchyTable

'''
This is reading the comment itself
'''
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'post_id', 'author_id', 'likes', 'content', 'reply_time', 'updated_at']
    
class CreateCommentHierarchySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentHierarchyTable
        fields = ['original_comment', 'descendant_comment', 'depth']
    
    def create(self, validated_data):
        closure_entry = CommentHierarchyTable(**validated_data)
        closure_entry.save()
        return closure_entry
        
        
class CommentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['content', 'updated_at']
    
    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.updated_at = validated_data.get('updated_at', instance.updated_at)
        instance.save()
        return instance