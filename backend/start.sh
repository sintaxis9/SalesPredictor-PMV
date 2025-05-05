#!/bin/bash
exec gunicorn app:app \
  --workers 4 \
  --bind 0.0.0.0:$PORT \
  --timeout 120 \
  --access-logfile - \
  --error-logfile -