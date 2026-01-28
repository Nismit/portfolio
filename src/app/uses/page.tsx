import Typography from '@/components/Typography';

export default function UsesPage() {
  return (
    <div>
      <Typography variant="headline" component="h1" margin={[0, 0, '4rem', 0]}>
        Uses
      </Typography>
      <Typography variant="body" component="p">
        What I use for work, creative something. Inspired from{' '}
        <a href="https://wesbos.com/uses" target="_blank" rel="noopener noreferrer">
          Wes Bos Uses page
        </a>
        .
      </Typography>

      <section>
        <Typography
          variant="subHeadline"
          component="h2"
          color="rgba(var(--secondary), 1.0)"
          margin={['4rem', 0, '1rem', 0]}
        >
          Hardware
        </Typography>
        <ul>
          <li>
            <Typography variant="body">
              Macbook Pro (13-inch, Intel, 2020) for work in my home
            </Typography>
          </li>
          <li>
            <Typography variant="body">Desktop PC mostly for gaming;</Typography>
            <ul>
              <li>
                <Typography variant="body">OS: Windows11</Typography>
              </li>
              <li>
                <Typography variant="body">CPU: Intel Core i5-12600K</Typography>
              </li>
              <li>
                <Typography variant="body">GPU: GeForce RTX 3080</Typography>
              </li>
              <li>
                <Typography variant="body">RAM: 32GB</Typography>
              </li>
              <li>
                <Typography variant="body">SSD (M.2): 1TB</Typography>
              </li>
              <li>
                <Typography variant="body">CASE: Fractal Design Torrent Nano</Typography>
              </li>
            </ul>
          </li>
          <li>
            <Typography variant="body">iPad mini (6th Gen)</Typography>
          </li>
          <li>
            <Typography variant="body">iPhone 13 mini</Typography>
          </li>
        </ul>
      </section>

      <section>
        <Typography
          variant="subHeadline"
          component="h2"
          color="rgba(var(--secondary), 1.0)"
          margin={['2rem', 0, '1rem', 0]}
        >
          Software
        </Typography>
        <ul>
          <li>
            <Typography variant="body">Visual Studio Code (Mainly using)</Typography>
          </li>
          <li>
            <Typography variant="body">neovim (Learning vim)</Typography>
          </li>
          <li>
            <Typography variant="body">Chrome</Typography>
          </li>
          <li>
            <Typography variant="body">bitwarden</Typography>
          </li>
          <li>
            <Typography variant="body">Figma</Typography>
          </li>
        </ul>
      </section>

      <section>
        <Typography
          variant="subHeadline"
          component="h2"
          color="rgba(var(--secondary), 1.0)"
          margin={['2rem', 0, '1rem', 0]}
        >
          Work Station
        </Typography>
        <ul>
          <li>
            <Typography variant="body">Progressive Desk (Standing Desk)</Typography>
          </li>
          <li>
            <Typography variant="body">Logitech G703 Mouse</Typography>
          </li>
          <li>
            <Typography variant="body">Shure SM7B</Typography>
          </li>
          <li>
            <Typography variant="body">Sony WH-CH700N</Typography>
          </li>
          <li>
            <Typography variant="body">Custom Build Mechanical Keyboard (Crkbd)</Typography>
          </li>
        </ul>
      </section>
    </div>
  );
}
