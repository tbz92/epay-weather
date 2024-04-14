    <template>

        <!-- Weather Overview -->
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2">{{ cityName }}</h1>
            <p class="text-sm mb-12">
                {{
                new Date(weatherData.currentTime).toLocaleDateString("en-us", {
                  weekday: "short",
                  day: "2-digit",
                  month: "long",
                })
                }}
                {{
                new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
                  timeStyle: "short",
                })
                }}
            </p>
            <p class="text-8xl mb-8">
                {{ Math.round(weatherData.current.temp) }}&deg;
            </p>
            <p>
                Feels like
                {{ Math.round(weatherData.current.feels_like) }} &deg;
            </p>
            <p class="capitalize">
                {{ weatherData.current.weather[0].description }}
            </p>
            <img class="w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
                " alt="" />
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <!-- Hourly Weather -->
        <div class="max-w-screen-md w-full py-12">
            <div class="max-w-screen-md w-full py-6 bg-white rounded overflow-hidden shadow-lg">
                <div class="mx-8 text-gray-950">
                    <h2 class="pb-3 text-xl border-b">Next Hours</h2>
                    <div class="flex gap-10 pt-5 pb-5 overflow-x-scroll">
                        <div v-for="hourData in weatherData.hourly" :key="hourData.dt"
                            class="flex flex-col gap-4 items-center">
                            <p class="text-xl">
                                {{ Math.round(hourData.temp) }}&deg;
                            </p>
                            <p class="whitespace-nowrap text-md text-blue-400">
                                {{hourData.pop
                                }}%
                            </p>
                            <img class="w-auto h-[50px] object-cover" :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
                                " alt="" />
                            <p class="whitespace-nowrap text-md">
                                {{
                                new Date(
                                hourData.currentTime
                                ).toLocaleTimeString("en-us", {
                                hour: "numeric",
                                })
                                }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <!-- Weekly Weather -->
        <div class="max-w-screen-md w-full py-12">
            <div class="max-w-screen-md w-full py-6 bg-white rounded overflow-hidden shadow-lg">
                <div class="mx-8 text-gray-950">
                    <h2 class="pb-3 text-xl border-b">Next 5 Days</h2>
                    <div v-for="day in weatherData.daily" :key="day.dt"
                        class="flex justify-between items-center mt-4 mb-4">
                        <img class=" w-[50px] h-[50px] object-cover" :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
                            " alt="" />

                        <div class="flex">
                            <div class="flex flex-col text-center">
                                <p> {{
                                    new Date(day.dt * 1000).toLocaleDateString(
                                    "en-us",
                                    {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric"
                                    })}}</p>

                                <p> {{ day.weather[0].description }}</p>
                            </div>
                        </div>

                        <div class="flex gap-2 justify-end">
                            <p>H: {{ Math.round(day.temp.max) }}&deg;</p>
                            <p>L: {{ Math.round(day.temp.min) }}&deg;</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
export default {
    props: {
        weatherData: Object,
        cityName: String
    }
}
</script>
