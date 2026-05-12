# syntax=docker/dockerfile:1

FROM node:24-alpine AS builder
WORKDIR /app

# Add libc6-compat for sharp/image optimization
RUN apk add --no-cache libc6-compat

# Match lockfile resolution when .npmrc is not copied yet (see root .npmrc legacy-peer-deps)
RUN npm config set legacy-peer-deps true

COPY package*.json package-lock.json* ./
RUN npm ci --ignore-scripts

COPY . .

# postinstall is skipped by npm ci; apply patches/ before build
RUN npx patch-package

# Build args for NEXT_PUBLIC_* variables
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

ARG NEXT_PUBLIC_DASH_LOGIN_URL
ENV NEXT_PUBLIC_DASH_LOGIN_URL=$NEXT_PUBLIC_DASH_LOGIN_URL

ARG NEXT_PUBLIC_DASH_REGISTER_URL
ENV NEXT_PUBLIC_DASH_REGISTER_URL=$NEXT_PUBLIC_DASH_REGISTER_URL

# Sensitive values via BuildKit secrets (not ARG/ENV) to avoid baking them into image layers
# Image build has no Postgres; skip CMS fetches during compile only (never set at runtime / in compose).
RUN --mount=type=secret,id=payload_secret \
    --mount=type=secret,id=database_url \
    export PAYLOAD_SECRET="$(tr -d '\r\n' < /run/secrets/payload_secret)" && \
    export DATABASE_URL="$(tr -d '\r\n' < /run/secrets/database_url)" && \
    SKIP_PAYLOAD_FETCH_AT_BUILD=1 npm run build


FROM node:24-alpine AS runner
RUN apk add --no-cache dumb-init ca-certificates
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy from builder with ownership
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

USER nextjs
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["dumb-init", "node", "server.js"]
