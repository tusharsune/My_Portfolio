from rest_framework import serializers
from .models import Skill, Project

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id','name','slug','proficiency','icon']

class ProjectSerializer(serializers.ModelSerializer):
    tech = SkillSerializer(many=True)
    class Meta:
        model = Project
        fields = ['id','title','slug','description','tech','image','live_url','repo_url','featured']
