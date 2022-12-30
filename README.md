### Blog：[Beats0.github.io](https://Beats0.github.io/)

Beats0's Jekyll theme blog on GitHub<br>

[![](https://data.jsdelivr.com/v1/package/gh/Beats0/beats0.github.io/badge)](https://www.jsdelivr.com/package/gh/Beats0/beats0.github.io)

Original Jekyll theme by [Huxpro](https://github.com/Huxpro/huxpro.github.io).<br>

[Jekyll Docker Image](https://hub.docker.com/r/jekyll/jekyll/)

使用docker-compose

```bash
cd
vim docker-compose.yml
docker-compose up
```

本地开发

将 `_config.yml` 中的 `cdnPrefix` 改为空即可

使用bash

```bash
λ docker run -it --rm -p 4000:4000 -v D:/site/github/Beats0.github.io:/srv/jekyll jekyll/jekyll jekyll server -w
```
```
bash-5.0# jekyll serve
```

访问 http://localhost:4000 即可