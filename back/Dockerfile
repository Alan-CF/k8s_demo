FROM ghcr.io/astral-sh/uv:python3.14-bookworm-slim


RUN useradd --system --uid 1000 --create-home django

WORKDIR /app
RUN chown -R django:django /app

USER django

COPY --chown=django:django pyproject.toml uv.lock ./

RUN uv sync --frozen --no-dev --no-install-project

COPY --chown=django:django . .

EXPOSE 8000
CMD ["uv", "run", "gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]