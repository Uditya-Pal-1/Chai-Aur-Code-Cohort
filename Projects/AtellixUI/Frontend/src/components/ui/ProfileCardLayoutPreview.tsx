import { useState } from 'react'

export default function ProfileCardLayoutPreview() {
  const [following, setFollowing] = useState(false)

  return (
    <article className="demo-profile-layout">
      <div className="demo-profile-cover"><span>ATX / CREATOR</span></div>
      <div className="demo-profile-body"><div className="demo-avatar demo-profile-avatar" aria-hidden="true">UP</div><span className="demo-eyebrow">DESIGN ENGINEER</span><h4>Uditya Pal</h4><p>Building considered digital products and systems for the people who make them.</p><div className="demo-profile-stats"><span><strong>12</strong> projects</span><span><strong>8.4k</strong> followers</span></div><button className={`demo-button ${following ? 'demo-button-primary' : ''}`} type="button" aria-pressed={following} onClick={() => setFollowing((value) => !value)}>{following ? 'Following' : 'Follow profile'}</button></div>
    </article>
  )
}
