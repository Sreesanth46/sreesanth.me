<script type="text/javascript">
(function (C, A, L) {
  let p = function (a, ar) {
    a.q.push(ar);
  };
  let d = C.document;
  C.Cal =
    C.Cal ||
    function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement('script')).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ['initNamespace', namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
})(window, 'https://app.cal.com/embed/embed.js', 'init');
Cal('init', '30min', { origin: 'https://app.cal.com' });

// Important: Please add the following attributes to the element that should trigger the calendar to open upon clicking.
// `data-cal-link="sreesanth.sh/30min"`
// data-cal-namespace="30min"
// `data-cal-config='{"layout":"month_view"}'`

Cal.ns['30min']('ui', { hideEventTypeDetails: false, layout: 'month_view' });
</script>

<script setup>
import TelephoneOutlined from '~/icons/TelephoneOutlined.vue';
</script>

<template>
  <button
    class="flex gap-1 relative"
    data-cal-link="sreesanth.sh/30min"
    data-cal-namespace="30min"
    data-cal-config='{"layout":"month_view"}'
  >
    <span class="hidden sm:block"> Contact </span>
    <span class="sm:hidden">
      <span
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent"
      >
        C
      </span>
      <TelephoneOutlined />
    </span>
  </button>
</template>
