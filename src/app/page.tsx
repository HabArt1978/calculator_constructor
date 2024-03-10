import ConstructorContainer from '@/components/ConstructorContainer/ConstructorContainer'
import StatusSwitchButtons from '@/components/StatusSwitchButtons/StatusSwitchButtons'

import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.sectionContainer}>
        <StatusSwitchButtons />
        <ConstructorContainer />
      </section>
    </main>
  )
}
