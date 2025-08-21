from django.db import models

class Data(models.Model):
    unemployment = models.FloatField(null=True, blank=True)
    coincident = models.FloatField(null=True, blank=True)
    leading_price = models.FloatField(null=True, blank=True)
    esi = models.FloatField(db_column='ESI', null=True, blank=True)
    export_price = models.FloatField(null=True, blank=True)
    current_account = models.FloatField(null=True, blank=True)
    gdp = models.FloatField(db_column='GDP', null=True, blank=True)
    land_price_change = models.FloatField(null=True, blank=True)
    ccsi = models.FloatField(db_column='CCSI', null=True, blank=True)
    manufacturing_capacity_utilization = models.FloatField(null=True, blank=True)
    us_policy_rate = models.FloatField(null=True, blank=True)
    kosdaq_index = models.FloatField(null=True, blank=True)
    capital_account = models.FloatField(null=True, blank=True)
    us_industrial_production = models.FloatField(null=True, blank=True)
    us_consumer_sentiment = models.FloatField(null=True, blank=True)
    us_cpi = models.FloatField(db_column='us_CPI', null=True, blank=True)
    economic_growth_rate = models.FloatField(null=True, blank=True)
    interest_rate = models.FloatField(null=True, blank=True)
    pred = models.FloatField(null=True, blank=True)
    datetime = models.CharField(max_length=10, null=True, blank=True)

    class Meta:
        db_table = 'data'  # 기존 테이블과 연결

class SentLabel(models.Model):
    label = models.CharField(max_length=20)  # 'positive', 'neutral', 'negative'

    class Meta:
        db_table = 'sent_labels'