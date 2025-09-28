from django.shortcuts import render
from rest_framework import viewsets
from .models import Skill, Project
from .serializers import SkillSerializer, ProjectSerializer
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from .models import ContactMessage

def index(request):
    return render(request, 'core/index.html')

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('-featured','-created_at')
    serializer_class = ProjectSerializer

@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        ContactMessage.objects.create(name=name,email=email,message=message)
        return redirect('/?sent=1')
    return redirect('/')
