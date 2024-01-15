<template>
  <div class="container">
    <div class="border-animate">
      <div class="ctn">⚡</div>
    </div>
    <div class="border-animate">
      <div class="ctn">css</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
@property --rotate {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.border-animate {
  margin: 20px 20px;
  width: 180px;
  height: 180px;

  background: repeating-conic-gradient(
    from var(--rotate),
    #ff2770 0%,
    #ff2770 5%,
    transparent 5%,
    transparent 40%,
    #ff2770 50%
  );
  border-radius: 20px;

  filter: drop-shadow(0 15px 50px #000);
  animation: rotating 2s linear infinite;
  animation-play-state: paused;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: repeating-conic-gradient(
      from var(--rotate),
      #45f3ff 0%,
      #45f3ff 5%,
      transparent 5%,
      transparent 40%,
      #45f3ff 50%
    );
    border-radius: 20px;
    animation: rotating 2s linear infinite;
    animation-delay: -0.5s;
    animation-play-state: paused;
  }
  &:hover {
    animation-play-state: running;
    &:before {
      animation-play-state: running;
    }
  }
  &:after {
    content: '';
    position: absolute;
    inset: 6px;
    border: 8px solid #25252b;
    border-radius: 15px;
    background-color: #2d2d39;
  }
  .ctn {
    position: absolute;
    inset: 40px;
    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    color: #fff;
    font-size: 2.5em;
    font-weight: 500;
    text-transform: uppercase;
    box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.5);
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }
}

@keyframes rotating {
  0% {
    --rotate: 0deg;
  }

  100% {
    --rotate: 360deg;
  }
}
</style>
