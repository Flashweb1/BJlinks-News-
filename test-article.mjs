export default async function run(page, ui) {
  // Click on the first article card to navigate to article detail
  await page.goto('http://localhost:4175/article/governor-oborevwori-commissions-delta-state-secretariat')
  await page.waitForTimeout(2000)
  await page.screenshot({ path: 'C:\\Users\\LIGHT\\Desktop\\Website code\\News website app\\preview-article.png', fullPage: false })
  
  // Navigate to admin login
  await page.goto('http://localhost:4175')
  await page.waitForTimeout(1000)
  
  // Find and click admin link or navigate directly
  // The app doesn't have a visible admin link, so we'll test the login page
  return { status: 'screenshots taken' }
}