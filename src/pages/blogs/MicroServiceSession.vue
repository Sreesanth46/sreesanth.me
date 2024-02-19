<template>
  <div class="flex flex-col gap-4 font-serif">
    <h1 class="text-2xl">
      <strong>
        Efficient User session Management in Microservice Architecture
      </strong>
    </h1>

    <p>
      When building applications with microservices, managing user sessions
      across services can be tricky. A robust session management approach is key
      to ensuring a smooth user experience. Here is an outline of how to share
      session state across independent services:
    </p>

    <div>
      <strong> Requirements: </strong>
      <ul class="list-disc pl-8">
        <li>Single sign-on across services</li>
        <li>Ability to invalidate sessions globally</li>
      </ul>
    </div>

    <div>
      <p><strong>Proposed Solution:</strong></p>
      <ol class="list-decimal pl-8">
        <li class="before:ml-1">
          <em>Asymmetric JWT Authentications</em> - services have the
          <i>public key</i> to verify tokens signed by the auth service's
          <i>private key</i>.
        </li>

        <li class="before:ml-1">
          <em>Shared Redis Cache </em> - stores
          <i>active access tokens</i> 𝘮𝘢𝘱𝘱𝘦𝘥 <i>to user IDs.</i> All services
          can connect to Redis to validate tokens.
        </li>
      </ol>
    </div>

    <div>
      <img
        src="./micro-service-session.jpg"
        alt="micro service session architecture" />
    </div>

    <div>
      <p>
        <em><strong>General Workflow:</strong></em>
      </p>
      <ul class="list-disc pl-8">
        <li>The authentication service generates Access and refresh tokens.</li>
        <li>
          An endpoint in the authentication service provides the public key for
          token verification.
        </li>
        <li>
          Users can forcefully remove existing sessions during login if needed.
        </li>
      </ul>
    </div>

    <div>
      <p>
        <em><strong>When a user logs for the first time:</strong></em>
      </p>

      <ul class="list-disc pl-8">
        <li>Auth service generates signed access and refresh JWT tokens</li>
        <li>
          Before issuing tokens, the auth service checks Redis for existing
          tokens with user ID, and raise error if found.
        </li>
        <li>
          A new access token is stored in Redis mapped to the user ID, with
          expiration time as time to leave(TTL).
        </li>
      </ul>
    </div>

    <div>
      <p>
        <em><strong>When user accesses other services:</strong></em>
      </p>

      <ul class="list-disc pl-8">
        <li>
          Services first fetch the auth service's public key if not cached.
        </li>
        <li>Token signature is verified against the public key.</li>
        <li>
          The token is checked against the Redis store - error if not found.
        </li>
      </ul>
    </div>

    <div>
      <p>
        <em><strong>Logging out:</strong></em>
      </p>

      <ul class="list-disc pl-8">
        <li>
          Auth service invalidates JWT by removing it from Redis. All services
          now deny access.
        </li>
      </ul>
    </div>

    <div>
      <p>
        <em><strong>Refreshing expired token:</strong></em>
      </p>

      <ul class="list-disc pl-8">
        <li>
          When a user requests an access token with a refresh token, generate a
          new access token <i>if none exists in Redis</i> (typically when the
          access token has expired).
        </li>
        <li>
          If an access token already exists, raise an error, prompting the user
          to log in again.
        </li>
      </ul>
    </div>

    <p class="pt-4 text-gray-900">
      This shared Redis token store allows services to coordinate sign-on state.
      Storing tokens for validity checks prevents unauthorized use if
      intercepted.
    </p>

    <p class="text-center">fin.</p>
  </div>
</template>
