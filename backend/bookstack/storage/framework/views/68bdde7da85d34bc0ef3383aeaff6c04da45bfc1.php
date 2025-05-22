<div notification="success" style="display: none;" data-autohide class="pos" role="alert" <?php if(session()->has('success')): ?> data-show <?php endif; ?>>
    <?php echo icon('check-circle'); ?> <span><?php echo nl2br(htmlentities(session()->get('success'))); ?></span><div class="dismiss"><?php echo icon('close'); ?></div>
</div>

<div notification="warning" style="display: none;" class="warning" role="alert" <?php if(session()->has('warning')): ?> data-show <?php endif; ?>>
    <?php echo icon('info'); ?> <span><?php echo nl2br(htmlentities(session()->get('warning'))); ?></span><div class="dismiss"><?php echo icon('close'); ?></div>
</div>

<div notification="error" style="display: none;" class="neg" role="alert" <?php if(session()->has('error')): ?> data-show <?php endif; ?>>
    <?php echo icon('danger'); ?> <span><?php echo nl2br(htmlentities(session()->get('error'))); ?></span><div class="dismiss"><?php echo icon('close'); ?></div>
</div>
<?php /**PATH /var/www/bookstack/resources/views/common/notifications.blade.php ENDPATH**/ ?>