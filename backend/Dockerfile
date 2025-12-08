# Use official PostgreSQL image
FROM postgres:16

# Set default environment variables
ENV POSTGRES_DB=neocodyr
ENV POSTGRES_USER=jha
ENV POSTGRES_PASSWORD=password

# Expose PostgreSQL port
EXPOSE 5432

# Data is stored in this volume by default
VOLUME ["/var/lib/postgresql/data"]
