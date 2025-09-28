from django.contrib import admin
from .models import Skill, Project, Experience, ContactMessage

admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Experience)
admin.site.register(ContactMessage)
