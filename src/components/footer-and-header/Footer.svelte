<script lang="ts">
	const d = new Date();
	let year = d.getFullYear();
</script>

<div class="footer">
	<span>
		&copy; {year},
	</span>

	<svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_882_4405)">
			<path
				d="M7.00341 26.8092V23.1086H5.18609C2.56524 23.1086 0.440674 25.2051 0.440674 27.7913V31.4919H2.25854C4.87884 31.4919 7.00341 29.3954 7.00341 26.8092Z"
				fill="url(#paint0_linear_882_4405)"
			/>
			<path
				d="M14.3675 26.8092V14.8108H12.5496C9.92877 14.8108 7.8042 16.9073 7.8042 19.4935V31.4919H9.62207C12.2429 31.4919 14.3675 29.3954 14.3675 26.8092Z"
				fill="url(#paint1_linear_882_4405)"
			/>
			<path
				d="M21.731 26.8094V7.57056H19.9131C17.2923 7.57056 15.1677 9.66705 15.1677 12.2533V31.4921H16.9856C19.6064 31.4921 21.731 29.3956 21.731 26.8094Z"
				fill="url(#paint2_linear_882_4405)"
			/>
			<path
				d="M29.0945 26.0496V0.275146H27.2767C24.6558 0.275146 22.5312 2.71192 22.5312 5.71743V31.4919H24.3491C26.97 31.4919 29.0945 29.0551 29.0945 26.0496Z"
				fill="url(#paint3_linear_882_4405)"
			/>
		</g>
		<defs>
			<linearGradient
				id="paint0_linear_882_4405"
				x1="-0.0426164"
				y1="31.0153"
				x2="7.38657"
				y2="23.4866"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#FFA726" />
				<stop offset="1" stop-color="#FF5722" />
			</linearGradient>
			<linearGradient
				id="paint1_linear_882_4405"
				x1="5.21878"
				y1="28.9408"
				x2="16.7966"
				y2="17.2079"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#FFA726" />
				<stop offset="1" stop-color="#FF5722" />
			</linearGradient>
			<linearGradient
				id="paint2_linear_882_4405"
				x1="10.7481"
				y1="27.1308"
				x2="25.9458"
				y2="11.7296"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#FFA726" />
				<stop offset="1" stop-color="#FF5722" />
			</linearGradient>
			<linearGradient
				id="paint3_linear_882_4405"
				x1="16.2635"
				y1="25.3069"
				x2="35.1085"
				y2="6.20957"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#FFA726" />
				<stop offset="1" stop-color="#FF5722" />
			</linearGradient>
			<clipPath id="clip0_882_4405">
				<rect width="30" height="32" fill="white" />
			</clipPath>
		</defs>
	</svg>
	<span> Fintastic </span>
</div>

<style>
	.footer {
		margin-top: auto;
		flex-grow: 0;
		flex-shrink: 0;
		display: flex;
		flex-flow: row nowrap;
		gap: 6px;
		height: 48px;
		align-items: center;
		align-content: center;
		justify-content: center;
		font-size: 0.8rem;
		color: #88a;

		svg {
			width: 12px;
		}
	}
</style>
