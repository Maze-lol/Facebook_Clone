from rest_framework import routers
from .api import FbViewSet
from django.conf.urls import include, url

router = routers.DefaultRouter()
router.register("posts", FbViewSet)

urlpatterns = [
    
    url("", include(router.urls))
        
    
]
""" urlpatterns = patterns(
...
    url(r'^service/', include(router.urls))
)
 """
