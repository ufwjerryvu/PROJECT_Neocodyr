from rest_framework import serializers
from datetime import datetime 
from .models import Comments, CommentHierarchyTable

'''
This is reading the comment itself
'''
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['post_id', 'author_id', 'likes', 'content', 'reply_time', 'updated_at']

class CreateCommentSerializer(serializers.ModelSerializer):
    reply_time = serializers.DateTimeField(format="%d/%m/%Y %H:%M")
    
    class Meta:
        model = Comments
        fields = ['post_id', 'author_id', 'content']
    
    def create(self, validated_data):
        new_comment = Comments(**validated_data)
        new_comment.reply_time = datetime.now().strftime("%d/%m/%Y %H:%M")
        new_comment.save()
        return new_comment

class CreateCommentHierarchySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentHierarchyTable
        fields = ['original_comment', 'depth']
    
'''
Serializer for the hierarcy table
'''
class CommentHierarchySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentHierarchyTable
        fields = ['original_comment', 'descendant_comment', 'depth']
    
    def create(self, validated_data):
        new_hierarchy = CommentHierarchyTable(**validated_data)
        new_hierarchy.save()
        return new_hierarchy
    
class PayloadReplySerializer(serializers.Serializer):
    new_comment = CreateCommentSerializer()
    hierarchy_item = CreateCommentHierarchySerializer()
    
    def create(self, validated_data):
        # Extract nested data
        new_comment = validated_data.pop('new_comment')
        comment_hierarchy = validated_data.pop('metadata')
        
        comment_serializer = CreateCommentSerializer(new_comment)
        if not comment_serializer.is_valid():
            return None

        new_comment_instance = comment_serializer.save()
        comment_hierarchy["descendant_comment"] = new_comment_instance.id
        
        comment_hierarchy_serializer = CommentHierarchySerializer(**comment_hierarchy)
        if not comment_hierarchy_serializer.is_valid():
            return None

        new_hierarchy_instance = comment_hierarchy_serializer.save()
        return [new_comment_instance, new_hierarchy_instance]

'''
Validating the comment view payload before enterning into database.
'''
class CommentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['content', 'updated_at']
    
    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.updated_at = validated_data.get('updated_at', instance.updated_at)
        instance.save()
        return instance
