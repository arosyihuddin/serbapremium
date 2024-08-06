import { HStack, Text } from '@chakra-ui/react'

export default {
  title: 'Explore Our Pricing',
  description:
    'Silahkan pilih paket sesuai kebutuhan anda, kami menyediakan beberapa paket dengan berbagai versi.',
  plans: [
  // Paket 30 Hari
    {
      id: 'belajar',
      title: 'Belajar 30 Hari',
      description: 'Anda mungkin butuh beberapa aplikasi ini untuk proses belajar anda.',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            Rp. 50.000
          </Text>
          <Text>Rp. 29.000</Text>
        </HStack>
      ),
      features: [
        {
          title: 'Akses ChatGPT, Codecademy, Coursera, Quiltbot, Perplexity',
        },
        {
          title: 'Free Update',
        },
        {
          title: 'Fitur Ekstensi',
        },
        {
          title: '99% Uptime',
        },
        {
          title: '30 Hari Akses Aplikasi Belajar',
        },
        // null,
        // {
        //   title: 'Private beta access',
        //   iconColor: 'green.500',
        // },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'full',
      title: 'Full Access 30 Hari',
      description: 'Anda dapat menikmati seluruh layanan kami.',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            Rp. 75.000
          </Text>
          <Text>Rp. 49.000</Text>
        </HStack>
      ),
      isRecommended: true,
      features: [
        {
          title: 'Akses Semua Layanan',
        },
        {
          title: 'Free Update',
        },
        {
          title: 'Fitur Ekstensi',
        },
        {
          title: '99% Uptime',
        },
        {
          title: '30 Hari Akses Semua Aplikasi',
        },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'nonton',
      title: 'Nonton 30 Hari',
      description: 'Anda mungkin butuh hiburan di saat suntuk bisa memilih paket nonton.',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            Rp. 50. 000
          </Text>
          <Text>Rp. 29.000</Text>
        </HStack>
      ),
      features: [
        {
          title: 'Akses Netflix, Prime Video, Viu, WeTV, Disney +',
        },
        {
          title: 'Free Update',
        },
        {
          title: 'Fitur Ekstensi',
        },
        {
          title: '99% Uptime',
        },
        {
          title: '30 Hari Akses Aplikasi Nonton',
        },
      ],
      action: {
        href: '#',
      },
    },

    // Paket 7 Hari
    {
      id: 'belajar7',
      title: 'Belajar 7 Hari',
      description: 'Anda mungkin butuh beberapa aplikasi ini untuk proses belajar anda.',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            Rp. 29.000
          </Text>
          <Text>Rp. 14.000</Text>
        </HStack>
      ),
      features: [
        {
          title: 'Akses ChatGPT, Codecademy, Coursera, Quiltbot, Perplexity',
        },
        {
          title: 'Free Update',
        },
        {
          title: 'Fitur Ekstensi',
        },
        {
          title: '99% Uptime',
        },
        {
          title: '30 Hari Akses Aplikasi Belajar',
        },
        // null,
        // {
        //   title: 'Private beta access',
        //   iconColor: 'green.500',
        // },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'full7',
      title: 'Full Access 7 Hari',
      description: 'Anda dapat menikmati seluruh layanan kami.',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            Rp. 50.000
          </Text>
          <Text>Rp. 29.000</Text>
        </HStack>
      ),
      features: [
        {
          title: 'Akses Semua Layanan',
        },
        {
          title: 'Free Update',
        },
        {
          title: 'Fitur Ekstensi',
        },
        {
          title: '99% Uptime',
        },
        {
          title: '7 Hari Akses Semua Aplikasi',
        },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'nonton7',
      title: 'Nonton 7 Hari',
      description: 'Anda mungkin butuh hiburan di saat suntuk bisa memilih paket nonton.',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            Rp. 30. 000
          </Text>
          <Text>Rp. 14.000</Text>
        </HStack>
      ),
      features: [
        {
          title: 'Akses Netflix, Prime Video, Viu, WeTV, Disney +',
        },
        {
          title: 'Free Update',
        },
        {
          title: 'Fitur Ekstensi',
        },
        {
          title: '99% Uptime',
        },
        {
          title: '7 Hari Akses Aplikasi Nonton',
        },
      ],
      action: {
        href: '#',
      },
    },

    // Paket 3 Hari
    {
      id: 'belajar3',
      title: 'Belajar 3 Hari',
      description: 'Anda mungkin butuh beberapa aplikasi ini untuk proses belajar anda.',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            Rp. 15.000
          </Text>
          <Text>Rp. 7.000</Text>
        </HStack>
      ),
      features: [
        {
          title: 'Akses ChatGPT, Codecademy, Coursera, Quiltbot, Perplexity',
        },
        {
          title: 'Free Update',
        },
        {
          title: 'Fitur Ekstensi',
        },
        {
          title: '99% Uptime',
        },
        {
          title: '30 Hari Akses Aplikasi Belajar',
        },
        // null,
        // {
        //   title: 'Private beta access',
        //   iconColor: 'green.500',
        // },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'full3',
      title: 'Full Access 3 Hari',
      description: 'Anda dapat menikmati seluruh layanan kami.',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            Rp. 30.000
          </Text>
          <Text>Rp. 12.000</Text>
        </HStack>
      ),
      features: [
        {
          title: 'Akses Semua Layanan',
        },
        {
          title: 'Free Update',
        },
        {
          title: 'Fitur Ekstensi',
        },
        {
          title: '99% Uptime',
        },
        {
          title: '3 Hari Akses Semua Aplikasi',
        },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'nonton3',
      title: 'Nonton 3 Hari',
      description: 'Anda mungkin butuh hiburan di saat suntuk bisa memilih paket nonton.',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            Rp. 15. 000
          </Text>
          <Text>Rp. 7.000</Text>
        </HStack>
      ),
      features: [
        {
          title: 'Akses Netflix, Prime Video, Viu, WeTV, Disney +',
        },
        {
          title: 'Free Update',
        },
        {
          title: 'Fitur Ekstensi',
        },
        {
          title: '99% Uptime',
        },
        {
          title: '3 Hari Akses Aplikasi Nonton',
        },
      ],
      action: {
        href: '#',
      },
    },
  ],
}
