import './Header.css';

export default function Header() {
  const imageUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfb5e134-31cc-4bca-a5de-fd324dc8cd9f/d4th7ky-058777e2-8ff7-4a46-a1ad-c79628ea8e89.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NmYjVlMTM0LTMxY2MtNGJjYS1hNWRlLWZkMzI0ZGM4Y2Q5ZlwvZDR0aDdreS0wNTg3NzdlMi04ZmY3LTRhNDYtYTFhZC1jNzk2MjhlYThlODkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.HizLd2QY1nA_OnMhDS2AyUE-9mk2ld8s6q6S6uE9Kn0";
  return (
    <div className='header'>
        <div className="headerTitle">
            <span className="headerTitleSm">Welcome to</span>
            <span className="headerTitleBg">Quiet Blogging</span>
        </div>
        <img className='headerImage' src={imageUrl} alt='coverImage' />
    </div>
  )
}
