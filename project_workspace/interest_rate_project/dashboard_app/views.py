from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
from .models import Data, SentLabel  # Django 모델 임포트
from django.db.models import Count

def index(request):
    return render(request, 'dashboard_app/index.html')

def main(request):
    return render(request, 'dashboard_app/dashboard/main.html')

def step1(request):
    return render(request, 'dashboard_app/dashboard/step1.html')

def team(request):
    return render(request, 'dashboard_app/dashboard/team.html')

# 금리 데이터 JSON으로 반환
def interest_rate_data(request):
    qs = Data.objects.all().values('datetime', 'interest_rate', 'pred')
    df = pd.DataFrame(list(qs))

    # NaN → None 처리 (JSON에서 null로 변환되도록)
    df = df.astype(object).where(pd.notnull(df), None)

    data = df.to_dict(orient='records')  # JSON 변환
    return JsonResponse(data, safe=False)

# 금리 + 비교 대상 변수 반환
def compare_data(request):
    var = request.GET.get('target', 'unemployment')

    allowed_fields = {
        'unemployment', 'coincident', 'leading_price', 'esi', 'export_price',
        'current_account', 'gdp', 'land_price_change', 'ccsi',
        'manufacturing_capacity_utilization', 'us_policy_rate', 'kosdaq_index',
        'capital_account', 'us_industrial_production', 'us_consumer_sentiment',
        'us_cpi', 'economic_growth_rate'
    }

    if var not in allowed_fields:
        return JsonResponse({'error': 'Invalid field'}, status=400)

    data = Data.objects.values('datetime', 'interest_rate', var)
    return JsonResponse(list(data), safe=False)

def correlation_data(request):
    variables = ['unemployment', 'coincident', 'leading_price', 'esi', 'export_price',
                'current_account', 'gdp', 'land_price_change', 'ccsi',
                'manufacturing_capacity_utilization', 'us_policy_rate', 'kosdaq_index',
                'capital_account', 'us_industrial_production', 'us_consumer_sentiment',
                'us_cpi', 'economic_growth_rate']
    original = [-0.441233, 0.388955, -0.240053, 0.115260, 0.632980,
                -0.422826, -0.301860, -0.240053, -0.297281,
                0.220855, 0.465745, -0.362704,
                0.181619, -0.103833, -0.542484, 0.228744, -0.170518]
    shifted = [-0.467882, 0.569666, 0.402862, 0.474970, 0.785306,
               -0.436061, -0.303896, -0.237306, 0.178913,
               0.316239, 0.444485, -0.401529,
               0.224616, 0.133647, -0.363534, 0.495746, 0.135709]

    return JsonResponse({
        'variables': variables,
        'original': original,
        'shifted': shifted
    })

def chart_data_view(request):
    data = SentLabel.objects.values('label').annotate(count=Count('label'))
    label_counts = {entry['label']: entry['count'] for entry in data}
    return JsonResponse(label_counts)