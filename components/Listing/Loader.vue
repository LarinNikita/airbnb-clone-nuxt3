<template>
    <Card
        class="group col-span-1 cursor-pointer rounded-xl border-0 shadow-none"
    >
        <CardContent class="p-0">
            <div class="grid w-full gap-4 p-0">
                <div class="relative overflow-hidden rounded-md">
                    <Skeleton
                        class="h-[200px] bg-foreground/20 transition-all hover:scale-105"
                    />
                    <div class="absolute right-2 top-2 flex flex-col space-y-2">
                        <Skeleton class="size-8 rounded-full" />
                    </div>
                </div>
                <Skeleton class="h-4 w-[70%] bg-foreground/20" />
                <Skeleton class="h-4 w-[40%] bg-foreground/20" />
            </div>
        </CardContent>
        <CardFooter
            class="w-full flex-col items-start space-y-4 border-0 px-0 py-4"
        >
            <Skeleton class="h-4 w-[30%] bg-foreground/20" />
            <Skeleton class="h-4 w-[15%] bg-foreground/20" />
        </CardFooter>
    </Card>
</template>
