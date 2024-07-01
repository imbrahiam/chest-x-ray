import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'

export const Logo: React.FC<HTMLChakraProps<'svg'>> = (props) => {
  const color = useColorModeValue('#231f20', '#fff')
  return (
<chakra.svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 64 64"
  fill="currentColor"
  {...props}
>
  {/* Vertical bar */}
  <rect x="29" y="8" width="6" height="48" />

  {/* Horizontal bar */}
  <rect x="8" y="29" width="48" height="6" />

  {/* Circle in the center */}
  <circle cx="32" cy="32" r="6" />
</chakra.svg>



  )
}
