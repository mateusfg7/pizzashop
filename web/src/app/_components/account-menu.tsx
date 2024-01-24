import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'

// import { StoreProfile } from './store-profile'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import { Dialog, DialogTrigger } from '~/components/ui/dialog'
import { Skeleton } from '~/components/ui/skeleton'
import { getProfile } from '~/api/get-profile'
import { getManagedRestaurant } from '~/api/get-managed-restaurant'
import { signOut } from '~/api/sign-out'

export function AccountMenu() {
  const { replace } = useRouter()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    })

  const { isPending: isSigningOut, mutateAsync: handleSignOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      replace('/sign-in')
    },
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='flex select-none items-center gap-2'
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className='h-4 w-40' />
            ) : (
              managedRestaurant?.name
            )}
            <ChevronDown className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <DropdownMenuLabel className='flex flex-col'>
            {isLoadingProfile ? (
              <div className='space-y-1.5'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-24' />
              </div>
            ) : (
              <>
                {profile?.name}
                <span className='text-xs font-normal text-muted-foreground'>
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Building className='mr-2 h-4 w-4' />
                <span>Perfil da loja</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              asChild
              className='text-rose-500 dark:text-rose-400'
              disabled={isSigningOut}
            >
              <button className='w-full' onClick={() => handleSignOut()}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <StoreProfile /> */}
    </Dialog>
  )
}
