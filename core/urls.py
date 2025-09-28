from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, ProjectViewSet, index , contact_view

router = DefaultRouter()
router.register('skills', SkillViewSet)
router.register('projects', ProjectViewSet)

urlpatterns = [
    path('', index, name='index'),
    path('api/', include(router.urls)),
    path('contact/', contact_view, name='contact'),

]
