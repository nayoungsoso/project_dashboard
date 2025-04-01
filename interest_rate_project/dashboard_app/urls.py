"""
URL configuration for interest_rate_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views  # views 모듈을 임포트

urlpatterns = [
    path('', views.index, name='index'),  # 빈 경로('/')에 index 뷰를 연결
    path('dashboard/main/', views.main, name='main'),
    path('dashboard/step1/', views.step1, name='step1'),
    path('dashboard/step2/', views.step2, name='step2'),
    path('dashboard/step3/', views.step3, name='step3'),
    path('dashboard/step4/', views.step4, name='step4'),
    path('dashboard/step5/', views.step5, name='step5'),
]
