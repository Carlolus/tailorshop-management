<label toggle-switch="<?php echo e($name); ?>" custom-checkbox class="toggle-switch">
    <input type="hidden" name="<?php echo e($name); ?>" value="<?php echo e($value?'true':'false'); ?>"/>
    <input type="checkbox" <?php if($value): ?> checked="checked" <?php endif; ?>>
    <span tabindex="0" role="checkbox"
          aria-checked="<?php echo e($value ? 'true' : 'false'); ?>"
          class="custom-checkbox text-primary"><?php echo icon('check'); ?></span>
    <span class="label"><?php echo e($label); ?></span>
</label><?php /**PATH /var/www/bookstack/resources/views/form/toggle-switch.blade.php ENDPATH**/ ?>