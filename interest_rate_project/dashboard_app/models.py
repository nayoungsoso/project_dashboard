from django.db import models

class TimeSeriesData(models.Model):
    date = models.DateField()  # 날짜 (X축)
    value = models.FloatField()  # 값 (Y축)

    def __str__(self):
        return f"{self.date}: {self.value}"
