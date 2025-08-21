from django.urls import path
from . import views  # views 모듈을 임포트

urlpatterns = [
    path('', views.index, name='index'),  
    path('dashboard/main/', views.main, name='main'),
    path('dashboard/step1/', views.step1, name='step1'),
    path('dashboard/team/', views.team, name='team'),
    path('api/interest_rate_data/', views.interest_rate_data, name='interest_rate_data'),
    path('api/compare_data/', views.compare_data, name='compare_data'),
    path('api/correlation_data/', views.correlation_data, name='correlation_data'),
    path('api/chart_data/', views.chart_data_view, name='chart_data'),
]
