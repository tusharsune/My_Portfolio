from rest_framework import serializers
from .models import Skill, Project, Experience, ContactMessage

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'slug', 'proficiency', 'icon']

class ProjectSerializer(serializers.ModelSerializer):
    # Nested serializer to show full skill details instead of just IDs
    tech = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'description', 'tech', 'image', 'live_url', 'repo_url', 'featured', 'created_at']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'