import React from 'react';

import Svg, {Path, G} from 'react-native-svg';

const WatchlistIcon = props => {
  return (
    <Svg
      width={62}
      height={46}
      viewBox="0 0 62 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M24.25 8h-4.5a.75.75 0 01-.75-.75V5c0-1.655 1.346-3 3-3s3 1.345 3 3v2.25a.75.75 0 01-.75.75zM20.5 6.5h3V5c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5v1.5zM39.25 21.5a.75.75 0 01-.75-.75V5c0-.827-.673-1.5-1.5-1.5A.75.75 0 1137 2c1.654 0 3 1.345 3 3v15.75a.75.75 0 01-.75.75zM26.5 26c-1.654 0-3-1.346-3-3v-2.25a.75.75 0 111.5 0V23c0 .827.673 1.5 1.5 1.5S28 23.827 28 23v-2.25a.75.75 0 111.5 0V23c0 1.654-1.346 3-3 3zM40 26a.75.75 0 110-1.5c.827 0 1.5-.673 1.5-1.5v-2.25a.75.75 0 111.5 0V23c0 1.654-1.346 3-3 3z"
        fill="#666"
      />
      <Path
        d="M37 3.5H22A.75.75 0 0122 2h15a.75.75 0 110 1.5zM40 26H26.5a.75.75 0 110-1.5H40a.75.75 0 110 1.5zM24.25 21.5a.75.75 0 01-.75-.75V7.25a.75.75 0 011.5 0v13.5a.75.75 0 01-.75.75zM42.25 21.5h-13.5a.75.75 0 110-1.5h13.5a.75.75 0 110 1.5zM36.25 8h-9a.75.75 0 010-1.5h9a.75.75 0 110 1.5zM36.25 11h-9a.75.75 0 010-1.5h9a.75.75 0 110 1.5zM36.25 14h-9a.75.75 0 010-1.5h9a.75.75 0 110 1.5zM31.75 17h-4.5a.75.75 0 110-1.5h4.5a.75.75 0 110 1.5z"
        fill="#666"
      />
      <Path
        d="M1.1 40c-.073 0-.13-.02-.17-.06a.252.252 0 01-.06-.17v-6.53c0-.073.02-.13.06-.17A.212.212 0 011.1 33h2.54c.493 0 .92.08 1.28.24.367.16.65.4.85.72.2.313.3.707.3 1.18s-.1.867-.3 1.18c-.2.313-.483.55-.85.71-.36.16-.787.24-1.28.24H1.87v2.5a.231.231 0 01-.07.17c-.04.04-.097.06-.17.06H1.1zm.76-3.57h1.73c.493 0 .863-.11 1.11-.33.247-.22.37-.54.37-.96 0-.413-.12-.733-.36-.96-.24-.227-.613-.34-1.12-.34H1.86v2.59zm7.358 3.67c-.507 0-.93-.097-1.27-.29-.34-.193-.6-.46-.78-.8-.18-.347-.28-.74-.3-1.18a7.566 7.566 0 01-.01-.43c0-.18.003-.323.01-.43.02-.447.12-.84.3-1.18.186-.34.45-.607.79-.8.34-.193.76-.29 1.26-.29s.92.097 1.26.29c.34.193.6.46.78.8.186.34.29.733.31 1.18.006.107.01.25.01.43 0 .173-.004.317-.01.43-.02.44-.12.833-.3 1.18-.18.34-.44.607-.78.8-.34.193-.764.29-1.27.29zm0-.77c.413 0 .743-.13.99-.39.246-.267.38-.653.4-1.16.006-.1.01-.227.01-.38s-.004-.28-.01-.38c-.02-.507-.154-.89-.4-1.15-.247-.267-.577-.4-.99-.4-.414 0-.747.133-1 .4-.247.26-.377.643-.39 1.15-.007.1-.01.227-.01.38s.003.28.01.38c.013.507.143.893.39 1.16.253.26.586.39 1 .39zm3.852.67a.253.253 0 01-.17-.06.252.252 0 01-.06-.17v-6.64c0-.067.02-.12.06-.16a.231.231 0 01.17-.07h.47c.073 0 .13.023.17.07.04.04.06.093.06.16v6.64c0 .067-.02.123-.06.17-.04.04-.097.06-.17.06h-.47zm2.52 0a.253.253 0 01-.17-.06.252.252 0 01-.06-.17v-4.74c0-.067.02-.12.06-.16a.231.231 0 01.17-.07h.48a.2.2 0 01.16.07c.04.04.06.093.06.16v4.74c0 .067-.02.123-.06.17a.216.216 0 01-.16.06h-.48zm-.08-6.17a.253.253 0 01-.17-.06.252.252 0 01-.06-.17v-.54c0-.067.02-.12.06-.16a.231.231 0 01.17-.07h.63a.2.2 0 01.16.07.2.2 0 01.07.16v.54a.231.231 0 01-.07.17.216.216 0 01-.16.06h-.63zm4.39 6.27c-.473 0-.883-.09-1.23-.27a1.96 1.96 0 01-.79-.79c-.186-.347-.286-.76-.3-1.24-.006-.1-.01-.233-.01-.4s.004-.3.01-.4c.014-.48.114-.89.3-1.23.187-.347.45-.61.79-.79.347-.187.757-.28 1.23-.28.387 0 .717.053.99.16.28.107.51.243.69.41.18.167.314.347.4.54.094.193.144.377.15.55a.175.175 0 01-.06.16.252.252 0 01-.17.06h-.48c-.066 0-.116-.013-.15-.04a.556.556 0 01-.1-.16c-.12-.327-.283-.557-.49-.69-.206-.133-.463-.2-.77-.2-.4 0-.726.123-.98.37-.246.247-.38.643-.4 1.19-.006.24-.006.473 0 .7.02.553.154.953.4 1.2.254.24.58.36.98.36.307 0 .564-.067.77-.2.207-.133.37-.363.49-.69a.415.415 0 01.1-.15c.034-.033.084-.05.15-.05h.48c.067 0 .124.02.17.06.047.04.067.093.06.16-.006.14-.036.283-.09.43-.053.147-.14.297-.26.45a1.91 1.91 0 01-.43.4 2.393 2.393 0 01-.63.28c-.24.067-.513.1-.82.1zm4.182 1.8c-.054 0-.1-.02-.14-.06a.192.192 0 01-.06-.14c0-.027.003-.053.01-.08a.516.516 0 01.04-.1l.77-1.83-1.91-4.51a.532.532 0 01-.05-.17.204.204 0 01.21-.21h.49c.066 0 .12.017.16.05a.24.24 0 01.08.12l1.52 3.64 1.56-3.64a.378.378 0 01.08-.12.259.259 0 01.17-.05h.47c.06 0 .11.02.15.06.04.04.06.087.06.14a.616.616 0 01-.05.18l-2.84 6.55a.316.316 0 01-.09.12c-.034.033-.087.05-.16.05h-.47zm9.435-1.8c-.613 0-1.123-.113-1.53-.34a2.233 2.233 0 01-.91-.95c-.207-.407-.32-.88-.34-1.42a36.046 36.046 0 010-1.78c.02-.54.133-1.013.34-1.42.207-.407.51-.723.91-.95.407-.227.917-.34 1.53-.34.46 0 .863.063 1.21.19s.633.297.86.51c.233.213.41.453.53.72.12.26.187.53.2.81a.164.164 0 01-.06.15c-.04.04-.09.06-.15.06h-.55a.268.268 0 01-.16-.05c-.04-.033-.07-.093-.09-.18-.113-.52-.327-.877-.64-1.07-.307-.193-.693-.29-1.16-.29-.533 0-.957.153-1.27.46-.313.3-.483.783-.51 1.45-.02.547-.02 1.107 0 1.68.027.667.197 1.153.51 1.46.313.3.737.45 1.27.45.467 0 .853-.097 1.16-.29.313-.193.527-.55.64-1.07.02-.087.05-.147.09-.18.047-.033.1-.05.16-.05h.55c.06 0 .11.02.15.06.047.04.067.09.06.15-.013.28-.08.553-.2.82-.12.26-.297.497-.53.71a2.477 2.477 0 01-.86.51c-.347.127-.75.19-1.21.19zm6.08 0c-.687 0-1.233-.21-1.64-.63-.407-.427-.63-1.007-.67-1.74a4.433 4.433 0 01-.01-.33c0-.14.003-.253.01-.34.027-.473.137-.887.33-1.24.193-.36.457-.637.79-.83.34-.193.737-.29 1.19-.29.507 0 .93.107 1.27.32.347.213.61.517.79.91.18.393.27.853.27 1.38v.17c0 .073-.023.13-.07.17a.216.216 0 01-.16.06h-3.46v.09c.013.273.073.53.18.77.107.233.26.423.46.57.2.147.44.22.72.22a1.44 1.44 0 00.99-.35c.1-.093.167-.163.2-.21.06-.087.107-.137.14-.15a.323.323 0 01.16-.03h.48c.067 0 .12.02.16.06.047.033.067.083.06.15-.007.1-.06.223-.16.37-.1.14-.243.28-.43.42-.187.14-.413.257-.68.35-.267.087-.573.13-.92.13zm-1.36-3.08h2.74v-.03c0-.3-.057-.567-.17-.8a1.288 1.288 0 00-1.21-.76c-.287 0-.533.07-.74.21-.2.133-.353.317-.46.55-.107.233-.16.5-.16.8v.03zM43.353 40a.252.252 0 01-.17-.06.252.252 0 01-.06-.17v-4.74c0-.067.02-.12.06-.16a.231.231 0 01.17-.07h.47a.2.2 0 01.16.07.2.2 0 01.07.16v.44a2 2 0 01.65-.55c.266-.147.606-.22 1.02-.22.433 0 .8.097 1.1.29.306.187.536.45.69.79.153.333.23.723.23 1.17v2.82c0 .067-.02.123-.06.17a.216.216 0 01-.16.06h-.5a.252.252 0 01-.17-.06.252.252 0 01-.06-.17V37c0-.467-.114-.83-.34-1.09-.227-.267-.56-.4-1-.4-.414 0-.747.133-1 .4-.247.26-.37.623-.37 1.09v2.77a.231.231 0 01-.07.17.216.216 0 01-.16.06h-.5zm7.796 0c-.373 0-.677-.07-.91-.21a1.273 1.273 0 01-.51-.61 2.522 2.522 0 01-.16-.94V35.6h-.78a.252.252 0 01-.17-.06.252.252 0 01-.06-.17v-.34c0-.067.02-.12.06-.16a.231.231 0 01.17-.07h.78v-1.67c0-.067.02-.12.06-.16a.231.231 0 01.17-.07h.47a.2.2 0 01.16.07.2.2 0 01.07.16v1.67h1.24a.2.2 0 01.16.07.2.2 0 01.07.16v.34a.231.231 0 01-.07.17.216.216 0 01-.16.06h-1.24v2.57c0 .313.053.56.16.74.107.18.297.27.57.27h.61a.2.2 0 01.16.07.2.2 0 01.07.16v.36a.231.231 0 01-.07.17.216.216 0 01-.16.06h-.69zm3.946.1c-.687 0-1.233-.21-1.64-.63-.407-.427-.63-1.007-.67-1.74a4.433 4.433 0 01-.01-.33c0-.14.004-.253.01-.34.027-.473.137-.887.33-1.24.194-.36.457-.637.79-.83.34-.193.737-.29 1.19-.29.507 0 .93.107 1.27.32.347.213.61.517.79.91.18.393.27.853.27 1.38v.17c0 .073-.023.13-.07.17a.216.216 0 01-.16.06h-3.46v.09c.014.273.074.53.18.77.107.233.26.423.46.57.2.147.44.22.72.22a1.44 1.44 0 00.99-.35c.1-.093.167-.163.2-.21.06-.087.107-.137.14-.15a.323.323 0 01.16-.03h.48c.067 0 .12.02.16.06.047.033.067.083.06.15-.006.1-.06.223-.16.37-.1.14-.243.28-.43.42-.187.14-.413.257-.68.35-.267.087-.573.13-.92.13zm-1.36-3.08h2.74v-.03c0-.3-.056-.567-.17-.8a1.288 1.288 0 00-1.21-.76c-.286 0-.533.07-.74.21-.2.133-.353.317-.46.55-.107.233-.16.5-.16.8v.03zM58.851 40a.252.252 0 01-.17-.06.252.252 0 01-.06-.17v-4.73c0-.067.02-.123.06-.17a.231.231 0 01.17-.07h.46c.066 0 .123.023.17.07.047.047.07.103.07.17v.44c.133-.227.316-.397.55-.51.233-.113.513-.17.84-.17h.4a.2.2 0 01.16.07c.04.04.06.093.06.16v.41c0 .067-.02.12-.06.16a.216.216 0 01-.16.06h-.6c-.36 0-.644.107-.85.32-.207.207-.31.49-.31.85v2.94a.232.232 0 01-.07.17.253.253 0 01-.17.06h-.49z"
        fill="#333"
      />
    </Svg>
  );
};

export default WatchlistIcon;
