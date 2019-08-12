		<!-- footer -->
		<footer class="footer" role="contentinfo">

			<!-- copyright -->
			<p class="copyright">
				&copy; <?php echo date('Y'); ?> Copyright <?php bloginfo('name'); ?>
				<span>&nbsp;|&nbsp;</span><a href="javascript:void(0);" data-target="#privacyPolicy" data-toggle="modal">Privacy Policy</a>
			</p>
			<!-- /copyright -->

		</footer>
		<!-- /footer -->

		<!-- Modals-->
    <div class="modal fade" id="privacyPolicy" tabindex="-1" role="dialog" aria-labelledby="privacyPolicyModalLiveLabel" style="display: none;" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLiveLabel">Privacy Policy</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <h4>Security</h4>
            <p>The servers that house this site, and its web properties, are maintained in a manner that safeguards the information in our databases effectively.</p>
            <h4>Personal Information</h4>
            <p>Unless you voluntarily provide us with any personal information, such as your e-mail address, this site does not collect personal information about you without your knowledge. When you visit our site, we collect the following information:</p>
            <ul>
              <li>The name of the domain from which you access the Internet (for example, <a href="https://www.aol.com" target="_blank">aol.com</a>)</li>
              <li>The date and time you access our site.</li>
              <li>The Internet address of the web site from which you linked directly to our site or the Internet address of the computer used to link to our site.</li>
              <li>This information is used for Site Management purposes and to target ads to 3rd party sites.</li>
            </ul>
            <p>NOTICE: Unless you choose to provide such information, we do not collect or maintain personal information about you when you visit our site. If you send us an e-mail message or complete a web form containing personal information, we collect and store the personal information which you choose to provide, such as your mailing address, e-mail address, the content of any request for information, and any comments you may submit.</p>
            <h4>Use of Information</h4>
            <p>If you choose to provide any personal information, such as your e-mail address, mailing address or phone number, we may use that information to contact you.</p>
            <h4>3rd Party Advertising Cookies Opt-Out</h4>
            <p>In addition to developing our privacy policy, we have provided you the opportunity to opt out of future 3rd party advertising cookies.</p>
            <p><a href="https://www.craftdc.com" target="_blank">Craftdc.com</a> and its web properties allows third parties to place cookies on our site for advertising purposes. This Privacy Policy does not cover the collection methods or use of the information collected by these vendors. These vendors have their own privacy policies and may be members of the <a href="https://www.networkadvertising.org/" target="_blank">Network Advertising Initiative</a> ("NAI").  To remove yourself from some or all NAI member advertising programs, please visit the <a href="https://www.networkadvertising.org/choices/" target="_blank">NAI Opt-Out Page</a> and follow the relevant instructions.  Please note that if you delete, block, or otherwise restrict cookies, or if you use a different computer or Internet browser, you may need to renew your opt-out choice.</p>
            <p>Not withstanding anything else in this policy, we or a data provider we have engaged may place or recognize a unique cookie on your browser to enable you to receive customized ads or content. These cookies contain no personally identifiable information. The cookies may reflect de-identified demographic or other data linked to data you voluntarily have submitted to us, e.g., your email address, that we may share with a data provider solely in hashed, non-human readable form. To opt-out of these cookies, please go to<a href="https://www.aboutads.info/choices" target="_blank">https://www.aboutads.info/choices</a>.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/dependencies.min.js"> </script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/main.js"></script>
		<?php wp_footer(); ?>

		<!-- analytics -->
		<script>
		(function(f,i,r,e,s,h,l){i['GoogleAnalyticsObject']=s;f[s]=f[s]||function(){
		(f[s].q=f[s].q||[]).push(arguments)},f[s].l=1*new Date();h=i.createElement(r),
		l=i.getElementsByTagName(r)[0];h.async=1;h.src=e;l.parentNode.insertBefore(h,l)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-XXXXXXXX-XX', 'yourdomain.com');
		ga('send', 'pageview');
		</script>

	</body>
</html>
