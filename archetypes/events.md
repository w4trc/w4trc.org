—
title: “{{ replace .Name “-“ “ “ | title }}”
date: {{ .Date }}                 # publish date
startDate: {{ .Date }}            # update if different
endDate: {{ .Date }}              # update for multi-day
location: “”
showOnHome: true
summary: “”
# image: “cover.jpg”
draft: false
—