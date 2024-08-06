import { chakra, HTMLChakraProps} from '@chakra-ui/react'

export const Logo: React.FC<HTMLChakraProps<'img'>> = (props) => {

  return (
    <chakra.img
      src="/static/images/Logo Serba Premium Landscape.png"
      alt="Logo Serba Premium"
      {...props}
    >
    </chakra.img>
  )
}
