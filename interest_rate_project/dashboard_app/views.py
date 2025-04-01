from django.shortcuts import render

# Create your views here.
def index(request):
    # 여기에 처리할 작업 코드 작성
    return render(request, 'dashboard_app/index.html') # index.html 파일을 보여줌

def main(request):
    # 여기에 처리할 작업 코드 작성
    return render(request, 'dashboard_app/dashboard/main.html')
def step1(request):
    # 여기에 처리할 작업 코드 작성
    return render(request, 'dashboard_app/dashboard/step1.html')
def step2(request):
    # 여기에 처리할 작업 코드 작성
    return render(request, 'dashboard_app/dashboard/step2.html')
def step3(request):
    # 여기에 처리할 작업 코드 작성
    return render(request, 'dashboard_app/dashboard/step3.html')
def step4(request):
    # 여기에 처리할 작업 코드 작성
    return render(request, 'dashboard_app/dashboard/step4.html')
def step5(request):
    # 여기에 처리할 작업 코드 작성
    return render(request, 'dashboard_app/dashboard/step5.html')

