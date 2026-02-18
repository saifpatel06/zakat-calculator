import Layout from '../../src/components/Layout';
import RamadanDashboard from '../../src/components/Ramadan/RamadanDashboard';
import Ramadaneducation from '../../src/components/Ramadan/Ramadaneducation';
import Meta from '../../src/components/Meta';

const Ramadan = ({ serverTimings, serverHijri }) => {
  return (
    <Layout>
      <Meta />
      <RamadanDashboard initialTimings={serverTimings} initialHijri={serverHijri}/>
      <Ramadaneducation hijri={serverHijri} />
    </Layout>
  );
};

const PUNE_LAT = 18.5204;
const PUNE_LON = 73.8567;

export async function getServerSideProps() {
  try {
    // Fetch prayer timings
    const timingRes = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${PUNE_LAT}&longitude=${PUNE_LON}&method=2`
    );
    const timingData = await timingRes.json();

    if (timingData.code !== 200) {
      throw new Error("Prayer API failed");
    }

    const timings = timingData.data.timings;
    const maghribTime = timings.Maghrib;

    // Decide Islamic date based on Maghrib
    const now = new Date();
    const [magHr, magMin] = maghribTime.split(':');
    const maghrib = new Date();
    maghrib.setHours(parseInt(magHr), parseInt(magMin), 0);

    let hijriFetchDate = new Date();

    if (now < maghrib) {
      hijriFetchDate.setDate(now.getDate() - 1);
    }

    const day = hijriFetchDate.getDate();
    const month = hijriFetchDate.getMonth() + 1;
    const year = hijriFetchDate.getFullYear();

    const hijriRes = await fetch(
      `https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`
    );
    const hijriData = await hijriRes.json();

    if (hijriData.code !== 200) {
      throw new Error("Hijri API failed");
    }

    const hijri = hijriData.data.hijri;

    return {
      props: {
        serverTimings: timings,
        serverHijri: {
          day: hijri.day,
          month: hijri.month.en,
          year: hijri.year,
          weekday: hijri.weekday.en,
          monthNumber: hijri.month.number
        }
      }
    };

  } catch (error) {
    console.error(error);

    return {
      props: {
        serverTimings: null,
        serverHijri: null
      }
    };
  }
}

export default Ramadan;
