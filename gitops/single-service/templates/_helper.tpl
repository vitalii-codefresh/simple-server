{{- define "app1port" -}}
{{if eq .Values.app1.port  8000}}
- name: PORT
    value: "{{.Values.app1.port}}"
{{- default 8000 -}}
{{- end -}}
{{- end -}}