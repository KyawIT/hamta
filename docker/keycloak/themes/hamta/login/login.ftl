<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
  <#if section = "header">
    <span class="hamta-wordmark">HAMTA</span>
    <span class="hamta-submark">Restaurant · Admin</span>
  <#elseif section = "form">
    <div class="hamta-login-intro">
      <span class="hamta-eyebrow">Geschützter Bereich</span>
      <h1>Willkommen zurück</h1>
      <p>Melde dich an, um den Restaurantbereich zu verwalten.</p>
    </div>

    <#if realm.password>
      <form id="kc-form-login" class="hamta-login-form" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
        <#if !usernameHidden??>
          <div class="hamta-field">
            <label for="username"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif realm.registrationEmailAsUsername>${msg("email")}<#else>${msg("usernameOrEmail")}</#if></label>
            <input tabindex="1" id="username" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="username" aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>" />
            <#if messagesPerField.existsError('username')>
              <span class="hamta-field-error" role="alert">${kcSanitize(messagesPerField.get('username'))?no_esc}</span>
            </#if>
          </div>
        </#if>

        <div class="hamta-field">
          <div class="hamta-label-row">
            <label for="password">${msg("password")}</label>
            <#if realm.resetPasswordAllowed>
              <a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a>
            </#if>
          </div>
          <input tabindex="2" id="password" name="password" type="password" autocomplete="current-password" aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>" />
          <#if usernameHidden?? && messagesPerField.existsError('username','password')>
            <span class="hamta-field-error" role="alert">${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}</span>
          </#if>
        </div>

        <#if realm.rememberMe && !usernameHidden??>
          <label class="hamta-remember">
            <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" <#if login.rememberMe??>checked</#if> />
            <span>${msg("rememberMe")}</span>
          </label>
        </#if>

        <button tabindex="4" class="hamta-submit" name="login" id="kc-login" type="submit">${msg("doLogIn")}</button>
      </form>
    </#if>
  <#elseif section = "info">
    <p class="hamta-help">Bei Fragen zum Zugang wende dich bitte an die Restaurantleitung.</p>
  </#if>
</@layout.registrationLayout>
