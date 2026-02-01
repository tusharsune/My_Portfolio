from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from django.shortcuts import render
# New imports for sending email
from django.core.mail import send_mail
from django.conf import settings
from .models import Skill, Project, Experience, ContactMessage
from .serializers import SkillSerializer, ProjectSerializer, ExperienceSerializer, ContactMessageSerializer

def index(request):
    # Renders the template that will contain your React app
    return render(request, 'index.html')

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('-featured', '-created_at')
    serializer_class = ProjectSerializer

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all().order_by('-order', '-start_date')
    serializer_class = ExperienceSerializer

@api_view(['POST'])
@permission_classes([permissions.AllowAny]) # Allow anyone to post
@authentication_classes([]) # Skip session auth to avoid CSRF errors for public form
def contact_view(request):
    print("--- Contact Form Submission Received ---") 
    # Handles JSON POST requests from the React frontend
    serializer = ContactMessageSerializer(data=request.data)
    
    if serializer.is_valid():
        # 1. Save to database first
        contact_message = serializer.save()
        print(f"Message saved to DB: {contact_message.subject}")
        
        # 2. Prepare Email
        subject = f"Portfolio Contact: {contact_message.subject}"
        message = f"""
        You have received a new message from your portfolio website.

        Name: {contact_message.name}
        Email: {contact_message.email}
        
        Message:
        {contact_message.message}
        """
        
        from_email = settings.EMAIL_HOST_USER 
        # Send to yourself
        recipient_list = [settings.EMAIL_HOST_USER] 

        # 3. Send Email
        try:
            print(f"Attempting to send email via {settings.EMAIL_BACKEND}...")
            send_mail(subject, message, from_email, recipient_list, fail_silently=False)
            print("SUCCESS: Email handed off to SMTP server.")
        except Exception as e:
            print(f"FAILURE: Error sending email: {e}")
            # Return the error to the React frontend so you can debug it in the browser
            return Response(
                {"message": "Saved to DB, but email failed.", "error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({"message": "Message sent successfully!"}, status=status.HTTP_201_CREATED)
    
    print(f"Validation Errors: {serializer.errors}")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)